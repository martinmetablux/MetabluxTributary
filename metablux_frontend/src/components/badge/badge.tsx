
interface BadgeProps{
    title:string;
    bg_clr?:string;
    clr?:string;
}

export const Badge: React.FC<BadgeProps> = ({ title, bg_clr="blue", clr="#fff" }) => {
  return (
    <div
      style={{
        backgroundColor: bg_clr,
        color:clr,
        padding: "1px 10px",
        borderRadius: "20px",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "14px",
      }}
    >
      <span
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          backgroundColor: clr,
          display: "inline-block",
        }}
      />
      {title}
    </div>
  );
};
