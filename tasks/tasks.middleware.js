const joi = require("joi");

const CreateTaskValidator = async (req, res, next) => {
  try {
    const payload = req.body;

    const schema = joi.object({
      title: joi.string().required(),
    });

    const { error, value } = await schema.validate(payload);

    if (!error) {
      next();
    } else {
      return res.status(400).json({
        status: "error",
        message: "Invalid payload",
        error: error.details,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  CreateTaskValidator,
};
