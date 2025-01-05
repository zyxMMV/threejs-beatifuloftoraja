import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { experiences } from "../constants";

import "react-vertical-timeline-component/style.min.css";
import { useEffect, useRef } from "react";
import sakura from "../assets/sakura.mp3";

const About = () => {
  const audioRef = useRef(new Audio(sakura));

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 1;
    audio.loop = true;

    audio
      .play()
      .catch((err) => console.error("Error saat memutar audio:", err));

    return () => {
      audio.pause();
      audio.currentTime = 0; 
    };
  }, []);

  return (
    <section className="max-container">
      <h1 className="head-text">
        Beautiful of{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          {" "}
          Toraja
        </span>{" "}
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
        Rumah Tongkonan adalah rumah adat khas Suku Toraja, yang berada di Sulawesi Selatan, Indonesia. Tongkonan memiliki arsitektur unik dengan atap melengkung menyerupai perahu terbalik, dibuat dari bambu atau seng. Struktur rumah ini dihiasi dengan ukiran kayu yang penuh warna, menampilkan motif-motif khas Toraja seperti kerbau, ayam, dan pola geometris, yang melambangkan kepercayaan, budaya, dan status sosial masyarakat Toraja.
        <br /><br />
        Rumah Tongkonan berfungsi sebagai pusat kehidupan sosial dan spiritual Suku Toraja. Selain menjadi tempat tinggal, Tongkonan digunakan untuk upacara adat seperti Rambu Solo' (upacara pemakaman) dan Rambu Tuka' (upacara syukuran). Rumah ini dianggap sakral karena diyakini sebagai warisan leluhur yang menghubungkan keluarga dengan para dewa.
        <br /><br />
        Suku Toraja sendiri dikenal dengan budaya yang kaya dan tradisi yang erat kaitannya dengan kehidupan setelah kematian. Salah satu tradisi yang terkenal adalah prosesi pemakaman megah, yang mencerminkan rasa hormat mendalam terhadap leluhur. Selain itu, seni ukir, tenun, dan tarian tradisional juga menjadi bagian integral dari identitas budaya Toraja.
        </p>
      </div>

      <div className="py-16">
        <div className="mt-12 flex">
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={
                  <div className="flex justify-center items-center w-full h-full">
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: experience.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className="text-black text-xl font-poppins font-semibold">
                    {experience.title}
                  </h3>
                  <p
                    className="text-black-500 font-medium text-base"
                    style={{ margin: 0 }}
                  >
                    {experience.company_name}
                  </p>
                </div>

                <ul className="my-5 list-disc ml-5 space-y-2">
                  {experience.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className="text-black-500/50 font-normal pl-1 text-sm"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className="border-slate-200" />
    </section>
  );
};

export default About;
