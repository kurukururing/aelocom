
const stats = () => {
  const statsData = [
    { icon: "👥", count: "100+", label: "Member Aktif" },
    { icon: "🏆", count: "140", label: "Moment Ikonik" },
    { icon: "⏳", count: "2 Bulan", label: "Terbentuk" }
  ];

  return (
    <div className="stats">
      <div className="aboutContainer">
        <div className="aboutDesc">
          <h1>Lebih Dari Sekedar <br /> Komunitas</h1>
          <p>Kami percaya bahwa kemenangan terasa lebih manis saat dirayakan bersama keluarga. Bergabunglah dengan ribuan anggota yang telah menemukan rumah keduanya di sini. Aeloria: Tempat kita berbagi hobi, cerita, dan masa depan bersama.</p><br />
          <p>Game mempertemukan kita, tapi rasa persaudaraanlah yang membuat kita tetap bersama. Aeloria hadir sebagai wadah di mana solidaritas dijunjung tinggi. Tak peduli skill atau rank-mu, kamu adalah bagian penting dari keluarga ini. Di sini, kamu tidak pernah berjuang sendirian.</p>
        </div>
        <div className="aboutImage">
          <video className="aboutImage" src="/aelovideo.mp4" autoPlay loop muted />
        </div>
      </div>
      <div className="lineBreak">

      </div>
      <div className="containerStats">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="icon">{stat.icon}</div>
            <h3>{stat.count}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default stats;