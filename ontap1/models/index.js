const { randomUUID } = require("crypto");
const { dynamodb } = require("../utils/aws-helper");

const tableName = process.env.TABLE_NAME || "Subject";

const SubjectModel = {
  createSubject: async subjectData => {
    const subjectId = randomUUID();
    const params = {
      TableName: tableName,
      Item: {
        id: subjectId,
        name: subjectData.name,
        type: subjectData.type,
        semester: subjectData.semester,
        faculty: subjectData.faculty,
        image: subjectData.image || "",
      },
    };

    await dynamodb.put(params).promise();
    return { id: subjectId, ...params.Item };
  },

  getSubjects: async () => {
    const params = { TableName: tableName };
    const subjects = await dynamodb.scan(params).promise();
    return subjects.Items || [];
  },

  getSubjectByKey: async (subjectId, name) => {
    const params = {
      TableName: tableName,
      Key: {
        id: subjectId,
        name,
      },
    };

    const subject = await dynamodb.get(params).promise();
    return subject.Item || null;
  },

  updateSubject: async (subjectId, name, subjectData) => {
    const params = {
      TableName: tableName,
      Key: {
        id: subjectId,
        name,
      },
      UpdateExpression:
        "set #t = :type, #s = :semester, #f = :faculty, #i = :image",
      ExpressionAttributeNames: {
        "#t": "type",
        "#s": "semester",
        "#f": "faculty",
        "#i": "image",
      },
      ExpressionAttributeValues: {
        ":type": subjectData.type,
        ":semester": subjectData.semester,
        ":faculty": subjectData.faculty,
        ":image": subjectData.image || "",
      },
      ReturnValues: "ALL_NEW",
    };

    const updatedSubject = await dynamodb.update(params).promise();
    return updatedSubject.Attributes;
  },

  deleteSubject: async (subjectId, name) => {
    const params = {
      TableName: tableName,
      Key: {
        id: subjectId,
        name,
      },
    };

    await dynamodb.delete(params).promise();
    return { id: subjectId, name };
  },

  getOneSubject: async subjectId => {
    const params = {
      TableName: tableName,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": subjectId,
      },
      Limit: 1,
    };

    const data = await dynamodb.query(params).promise();
    return data.Items?.[0] || null;
  },
};

module.exports = SubjectModel;
