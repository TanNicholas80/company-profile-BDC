import React from "react";

type StatCardProps = {
  jumlah: string;
  judul: string;
  deskripsi: string;
};

const StatCard: React.FC<StatCardProps> = ({ jumlah, judul, deskripsi }) => {
  return (
    <div className="bg-accentColor-950 flex flex-col gap-1 items-center justify-center p-4 text-white rounded-xl">
      <h2 className="text-4xl font-semibold">{jumlah}</h2>
      <h3 className="text-xl font-semibold">{judul}</h3>
      <p className="text-sm text-center">{deskripsi}</p>
    </div>
  );
};

export default StatCard;
