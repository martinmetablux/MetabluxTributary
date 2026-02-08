import React from "react";
import type { MBCardsProps } from "./MB_cards.type";
import style from "./MB_cards.module.css"

export const MB_Cards: React.FC<MBCardsProps> = ({
  height = "250px",
  width = "300px",
  title,
  content,
  title_clr,
  content_clr,
  background_clr,
  padding
}) => {
  return (
    <div
      className={style.MB_Cards}
      style={{ height, width, background:background_clr,padding }}
    >
      <div className={style.MB_Card_Body}>
        <h3 style={{color:title_clr}}>{title}</h3>
        <p style={{color:content_clr}}>{content}</p>
      </div>
    </div>
  );
};
