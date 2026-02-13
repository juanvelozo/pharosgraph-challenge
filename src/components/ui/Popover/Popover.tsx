import { memo, type ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const Popover = memo(function Popover({
  trigger,
  content,
  open: controlledOpen,
  onOpenChange,
  className = "",
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const next = !open;
    if (isControlled) {
      onOpenChange?.(next);
    } else {
      setInternalOpen(next);
    }
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        contentRef.current &&
        !contentRef.current.contains(target)
      ) {
        if (isControlled) {
          onOpenChange?.(false);
        } else {
          setInternalOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, isControlled, onOpenChange]);

  const positionContent = () => {
    if (!containerRef.current || !contentRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    contentRef.current.style.top = `${rect.bottom + 8}px`;
    contentRef.current.style.left = `${rect.left}px`;
    contentRef.current.style.minWidth = `${Math.max(rect.width, 256)}px`;
  };

  useEffect(() => {
    if (!open) return;
    positionContent();
    window.addEventListener("scroll", positionContent, true);
    window.addEventListener("resize", positionContent);
    return () => {
      window.removeEventListener("scroll", positionContent, true);
      window.removeEventListener("resize", positionContent);
    };
  }, [open]);

  return (
    <>
      <div ref={containerRef} className={`relative inline-block ${className}`}>
        <div onClick={handleToggle} className="contents">
          {trigger}
        </div>
      </div>
      {open &&
        createPortal(
          <div
            ref={contentRef}
            className="fixed z-9999 min-w-64 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            role="dialog"
            aria-modal="true"
            style={{ top: 0, left: 0 }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
});

export default Popover;
