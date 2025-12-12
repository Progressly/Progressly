const testAuth = async () => {
  const baseUrl = "http://127.0.0.1:4000/api/auth";
  const user = {
    username: "testuser_" + Date.now(),
    email: "test_" + Date.now() + "@example.com",
    password: "password123",
  };

  console.log("Testing Registration...");
  try {
    const regRes = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const regData = await regRes.json();
    console.log("Registration Status:", regRes.status);
    console.log("Registration Response:", JSON.stringify(regData, null, 2));

    if (regRes.status !== 201) throw new Error("Registration failed");
  } catch (e) {
    console.error("REGISTRATION ERROR:", e.message);
    console.error(e);
    return;
  }

  console.log("Testing Login...");
  try {
    const loginRes = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: user.email,
        password: user.password,
      }),
    });
    const loginData = await loginRes.json();
    console.log("Login Status:", loginRes.status);
    console.log("Login Response:", loginData);

    if (loginRes.status !== 200) throw new Error("Login failed");
  } catch (e) {
    console.error(e);
    return;
  }
  
  console.log("Auth Flow Verified Successfully!");
};

testAuth();
