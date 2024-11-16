import aboutImg from "../../assets/about-img.png";

export default function About() {
  return (
    <div className="flex-grow bg-primary p-10 text-txtLight lg:flex lg:items-center lg:justify-center">
      <div className="mb-4 lg:w-1/2">
        <h1 className="mb-2 font-dancing text-4xl">Lezzet Lab</h1>
        <p className="">
          2024 yılında kurulan Lezzet Lab, yenilikçi bir bakış açısıyla yola
          çıkarak lezzeti bir sanat ve deneyim haline getirmeyi hedefledi.
          Samimi atmosferimiz ve yaratıcı mutfak anlayışımızla, kısa sürede
          lezzet tutkunlarının buluşma noktası olduk.
          <br />
          <br />
          Adımızdaki “Lab” ifadesi, yenilikçi tarifler geliştirme tutkumuzu ve
          her detaya verdiğimiz önemi yansıtıyor. Taptaze malzemelerle
          hazırlanan lezzetlerimiz, keyifli bir yemek deneyimi yaşamanız için
          özenle hazırlanıyor.
          <br />
          <br />
          Güler yüzlü ekibimiz ve sıcak ortamımızla, hem bir molaya hem de
          unutulmaz anlara ev sahipliği yapıyoruz.
          <br />
          <br />
          Lezzet Lab: Lezzetin buluşma noktası!
        </p>
      </div>
      <div className="flex justify-center">
        <img className="w-1/2" src={aboutImg} alt="hamburger image" />
      </div>
    </div>
  );
}
