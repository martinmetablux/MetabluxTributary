import React, { useRef, useEffect, useState } from "react";

// Menu item type
export type MenuOption = {
    id?: string | number; // Optional unique identifier for the menu item
    label: React.ReactNode;
    onClick: () => void;
    svgicon?: React.ReactNode;
    danger?: boolean; // For red destructive actions
};
type Placement = "bottom-right" | "bottom-left" | "top-right" | "top-left";

interface MenuListProps {
    options: MenuOption[];
    children?: React.ReactNode; // trigger (optional)
    preferredPlacement?: Placement;
}

export const MenuList: React.FC<MenuListProps> = ({
    options,
    children,
    preferredPlacement = "bottom-right",
}) => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<Placement>(preferredPlacement);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (open && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            // You can tweak the thresholds for "left" and "top" detection
            let newPlacement: Placement = "bottom-right";
            if ((rect.top < vh / 2) || (vh - rect.top > 350)
            ) { // near top
                if ((rect.left < vw / 2) || (vw - rect.right > 400)) {
                    newPlacement = "bottom-right"; // Top-left quarter
                } else {
                    newPlacement = "bottom-left"; // Top-right quarter
                }
            } else { // near bottom
                if ((rect.left < vw / 2) || (vw - rect.right > 400)) {
                    newPlacement = "top-right"; // Bottom-left quarter
                } else {
                    newPlacement = "top-left"; // Bottom-right quarter
                }
            }
            setPlacement(newPlacement);
        }
    }, [open]);

    // Close menu on outside click
    useEffect(() => {
        if (!open) return;
        function handle(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, [open]);

    // Simple Esc key close
    useEffect(() => {
        if (!open) return;
        function handle(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        window.addEventListener("keydown", handle);
        return () => window.removeEventListener("keydown", handle);
    }, [open]);

    const getMenuStyle = () => {
        switch (placement) {
            case "bottom-right":
                return { top: "100%", left: 0 };
            case "bottom-left":
                return { top: "100%", right: 0 };
            case "top-right":
                return { bottom: "100%", left: 0 };
            case "top-left":
                return { bottom: "100%", right: 0 };
            default:
                return { bottom: "100%", right: 0 };
        }
    };

    // Use children as trigger, or default three-dot
    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <button
                className="ls-menu-trigger"
                onClick={() => setOpen((o) => !o)}
                ref={triggerRef}
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Open menu"
                tabIndex={0}
            >
                {children ? (
                    children
                ) : (
                    <svg width="20" height="20" fill="none" aria-hidden="true">
                        <circle cx="10" cy="4" r="1.5" fill="currentColor" />
                        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                        <circle cx="10" cy="16" r="1.5" fill="currentColor" />
                    </svg>
                )}
            </button>
            {open && (
                <div
                    className="ls-menu-list"
                    ref={menuRef}
                    style={{
                        zIndex: 100,
                        ...getMenuStyle(),
                        position: "absolute",
                    }}
                >
                    {options.map((opt, i) => (
                        <button
                            key={opt.id || i}
                            className={`ls-menu-list-item${opt.danger ? " ls-menu-danger" : ""}`}
                            onClick={() => {
                               // setOpen(false);
                                opt.onClick();
                            }}
                            tabIndex={0}
                        >
                            {opt.svgicon}{opt.label}
                        
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
