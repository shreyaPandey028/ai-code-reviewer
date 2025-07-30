 module.exports.getReview = async (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).send('Prompt is required.');
  }

  try {
    // ✅ Dummy response for testing (remove aiService)
    const response = `Test response: received code -> ${code}`;
    res.send({ response });
  } catch (error) {
    console.error("🔥 Error in getReview:", error);
    res.status(500).send("❌ Internal Server Error");
  }
};