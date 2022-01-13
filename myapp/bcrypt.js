const bcrypt = require("bcrypt");

const run = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    console.log("salt found", salt);
    try {
      var hash = await bcrypt.hash(password, salt);
      console.log("hash found", hash);
    } catch (err) {
      console.log("hash not found", err);
    }
  } catch (err) {
    console.log("salt not found", err);
  }
};

run("ashish");
