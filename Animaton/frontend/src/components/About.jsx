import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AudioPlayer from './AudioPlayer'; // Importation du composant AudioPlayer

const About = () => {
  const images = [
    "/img/Leonardo_Phoenix_09_desine_2_etudiant_un_jeune_noir_avec_des_1.jpg",
    "/img/Leonardo_Phoenix_09_desine_2_etudiant_un_jeune_noir_avec_des_2.jpg",
    "/img/Leonardo_Phoenix_09_desine_2_etudiant_un_jeune_noir_avec_des_3.jpg",
    "/img/Leonardo_Phoenix_09_desine_2_etudiant_un_jeune_noir_avec_des_c_0 (1).jpg",
    "/img/Leonardo_Phoenix_09_desine_2_etudiant_un_jeune_noir_avec_des_c_2.jpg",
    "/img/Leonardo_Phoenix_09_desine_2_etudiant_un_jeune_noir_avec_des_c_0.jpg",
    "/img/Leonardo_Phoenix_09_desine_2_etudiant_un_jeune_noir_avec_des_c_0 (1).jpg"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true, // Ajoutez cette ligne pour centrer les images
    centerPadding: '5%', // Ajoutez cette ligne pour ajouter un padding de chaque côté
  };

  return (
    <section id="about" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-6">
        {/* Carrousel d'images en haut */}
        <div className="mb-12">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="flex justify-center items-center">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-64 max-w-xs h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 mx-auto"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* AudioPlayer */}
        <AudioPlayer />

        {/* Texte en dessous */}
        <h2 className="text-4xl font-bold text-center mb-8">À propos de nous</h2>
        <p className="text-lg leading-relaxed mb-6">
          Bienvenue sur notre site dédié aux animes et mangas. Ce projet est réalisé dans le cadre de nos études à l'Université Paris 8 par Élie et Maxime. Notre mission est de vous fournir les meilleures recommandations, critiques et classements pour l'année 2025.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Nous sommes passionnés par l'univers des animes et mangas, et nous avons développé ce site en utilisant React pour le frontend et Django pour le backend. Nous espérons que vous trouverez votre prochaine série préférée grâce à nous.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Si vous avez des questions ou des suggestions, n'hésitez pas à nous contacter. Nous serions ravis d'avoir de vos nouvelles !
        </p>
      </div>
    </section>
  );
};

export default About;
