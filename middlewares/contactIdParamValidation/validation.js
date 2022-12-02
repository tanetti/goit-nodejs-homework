const contactIdParamValidation = (req, res, next) => {
  const { contactId } = req.params;

  if (!Number(contactId)) {
    return res.status(400).json({
      code: "param-error",
      message: 'Incorrect "cotactId" parameter',
    });
  }

  next();
};

module.exports = { contactIdParamValidation };
