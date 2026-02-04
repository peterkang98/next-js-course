"use client";

import styles from "./modal.module.css"
import {ReactNode, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {useRouter} from "next/navigation";

export default function Modal({children}: {children: ReactNode;}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({top: 0});
    }
  }, []);

  return createPortal(
    <dialog
      // esc를 누르면 뒤로가기
      onClose={() => router.back()}
      ref={dialogRef}
      className={styles.modal}
      onClick={(e) => {
        // 모달의 배경이 클릭되었으면 -> 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
    >{children}</dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
};