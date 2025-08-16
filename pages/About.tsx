import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-white text-center mb-12">About Me</h1>
      
      <div className="flex flex-col items-center gap-8">
        <img 
          src="assets/images/avatar.jpg" 
          alt="Profile Avatar" 
          className="rounded-full w-48 h-48 md:w-56 md:h-56 object-cover border-4 border-surface"
        />
        <div className="max-w-2xl text-lg text-text-primary text-left">
          <p className="mb-4">
            プログラミング歴9年目のゲーム制作者。主にUnityとC#を用いたゲーム開発を得意としています。
            個人による制作を主として活動しており、過去には日本ゲーム大賞で銀賞を受賞、Unityユースクリエイターカップでブロンズアワードを受賞など、
            数々の実績を挙げてきました。
          </p>
          <p>
            プレイヤーが「触っていて楽しい」と感じるような操作感や、
            ゲームの世界に没入できるような体験作りを重視しています。
            新しい技術への探究心も強く、常にスキルアップを目指しています。
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Skills</h2>
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-col gap-4">
                <div className="bg-surface text-white px-5 py-5 rounded-lg flex items-center justify-center gap-4 shadow-lg">
                    <img src="assets\images\U_Cube_1C_White.svg" alt="Unity Logo" className="h-12 w-12" />
                    <span className="text-3xl font-bold tracking-wide">Unity</span>
                </div>
                <div className="bg-surface text-white px-5 py-5 rounded-lg flex items-center justify-center gap-4 shadow-lg">
                    <img src="assets\images\c--4.svg" alt="C# Logo" className="h-12 w-12" />
                    <span className="text-3xl font-bold tracking-wide">C#</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface text-white p-5 rounded-lg flex items-center justify-center gap-4 shadow-lg">
                        <img src="assets\images\blockbench_logo_white.svg" alt="BlockBench Logo" className="h-9 w-9" />
                        <span className="text-2xl md:text-3xl font-bold tracking-wide">BlockBench</span>
                    </div>
                    <div className="bg-surface text-white p-5 rounded-lg flex items-center justify-center gap-4 shadow-lg">
                        <img src="assets\images\github-mark-white.svg" alt="Github Logo" className="h-9 w-9" />
                        <span className="text-2xl md:text-3xl font-bold tracking-wide">Github</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">SNS</h2>
        <div className="max-w-md mx-auto flex justify-center">
            <a 
              href="https://x.com/Nemesis_Creator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface text-white p-5 rounded-lg flex items-center justify-center gap-4 shadow-lg w-full hover:bg-overlay transition-colors duration-300"
            >
              <img src="assets/images/x_logo.svg" alt="X (formerly Twitter) Logo" className="h-9 w-9" />
              <span className="text-2xl font-bold tracking-wide">Follow on X</span>
            </a>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default About;