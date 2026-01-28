const userInfo = async (userName,userMessage,aiResponse,imageLink) => {
  try {
    // 1. Generate unique user ID
    let newUser = false;
    let userId = localStorage.getItem("uniqueUserId");
    if (!userId) {
      newUser = true;
      userId = crypto.randomUUID();
      localStorage.setItem("uniqueUserId", userId);
    }

    // 2. Ambil IP user
    let userIP = "Unknown";
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();
      userIP = ipData.ip;
    } catch { }

    // 3. Ambil device info
    const userAgent = navigator.userAgent;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const pixelRatio = window.devicePixelRatio;

    // 4. Waktu sesuai timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = `${new Date().toLocaleString()} (${timezone})`;

    // 5. Battery info
    let batteryLevel = null;
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      batteryLevel = `${(battery.level * 100).toFixed(0)}%`;
    } else {
      batteryLevel = "Not supported";
    }

    // 6. Buat message
    const message = {
      userId,
      newUser,
      userName,
      userMessage,
      aiResponse,
      userIP,
      userAgent,
      screenWidth,
      screenHeight,
      pixelRatio,
      batteryLevel,
      localTime,
      timezone,
      imageLink,
    };

    // 7. Kirim ke backend Netlify Function (supabase)
    await fetch("/.netlify/functions/sendSupabase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    /*
    // 8. Kirim ke Google Sheets via Netlify Function
    await fetch("/.netlify/functions/sendSheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    */


  } catch (err) {
    console.error("❌", err);
  }
}

export default userInfo;