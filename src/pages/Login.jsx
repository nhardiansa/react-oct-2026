import { loginGoogle } from "../lib/auth";
import { useAuth } from "../stores/authStore";

export default function Login() {
  const { setUser } = useAuth((state) => state);

  const handleLogin = async () => {
    const result = await loginGoogle();

    if (!result) {
      alert("Login gagal. Silakan coba lagi.");
    }
    setUser(result);
  };

  return (
    <div className="sign-in-page min-h-screen flex items-center justify-center bg-[#14181C]">
      {/* Box Sign In */}

      <div className="sign-in-box font-inter bg-[#1C2127] border border-[#3A4049] rounded-lg pt-10.75 pb-9.5 px-10 flex flex-col items-center w-115">
        <div className="logo font-bebas flex items-center gap-2 text-2xl">
          <div className="cicle w-3 h-3 bg-[#FF8000] rounded-full"></div>
          <span className="font-bebas">Sinemata</span>
        </div>
        <div className="heading font-bebas mt-6.5 mb-2.5">
          <h1 className="text-[32px]">Masuk ke Sinemata</h1>
        </div>
        <div className="sub-heading">
          <p className="text-[#9CA3AF] text-[13px] text-center">
            Akses watchlist personal dan tulis review film favorit kamu
          </p>
        </div>

        {/* Button Sign In with Google */}
        <button
          onClick={handleLogin}
          className={`sign-in-button mt-9.75 mb-5.75 btn bg-[#FF8000] w-full text-white py-3.5 rounded-lg text-sm font-medium hover:bg-[#FF8000]/80 transition duration-300`}
        >
          {"Masuk dengan Google"}
        </button>

        <span className="text-[#6B7280] text-[12px] text-center mb-8">
          Otomatis dibuatkan akun saat pertama kali masuk. Tidak perlu password
          — Google yang menangani.
        </span>

        <div className="flex items-center w-full justify-between mb-8">
          {/* Horizontal Line */}
          <div className="horizontal-line w-15.75 h-px bg-[#3A4049]"></div>
          <span className="text-[#6B7280] text-[11px]">
            apa yang bisa kamu lakukan setelah masuk?
          </span>
          <div className="horizontal-line w-15.75 h-px bg-[#3A4049]"></div>
        </div>

        <div className="what-we-can-do flex flex-col gap-5 w-full">
          <div className="item-do flex items-center gap-4">
            <div className="icon bg-[#FF8000]/12 border border-[#FF8000]/25 w-9 h-9 rounded-lg flex items-center justify-center">
              {/* <Heart className="w-4 text-[#FF8000]" /> */}
              <span className="material-icons-round scale-75 text-[#FF8000]">
                favorite_border
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF]">
              Simpan film ke <b className="text-white">watchlist personal</b>
            </p>
          </div>
          <div className="item-do flex items-center gap-4">
            <div className="icon bg-[#FF8000]/12 border border-[#FF8000]/25 w-9 h-9 rounded-lg flex items-center justify-center">
              {/* <Star className="w-4 text-[#FF8000]" /> */}
              <span className="material-icons-round scale-75 text-[#FF8000]">
                star
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF]">
              Tulis{" "}
              <b className="text-white">
                review & rating untuk film yang kamu tonton
              </b>
            </p>
          </div>
          <div className="item-do flex items-center gap-4">
            <div className="icon bg-[#FF8000]/12 border border-[#FF8000]/25 w-9 h-9 rounded-lg flex items-center justify-center">
              {/* <Search className="w-4 text-[#FF8000]" /> */}
              <span className="material-icons-round scale-75 text-base text-[#FF8000]">
                search
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF]">
              Lacak film yang sudah kamu tonton sepanjang tahun
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
