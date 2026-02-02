"use client"

import {startTransition, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Error({ error, reset }: { error: Error; reset: () => void; }) {

  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>검색 과정에서 오류가 발생했습니다.</h3>
      {/*<button onClick={() => reset()}>다시 시도</button>*/}
      {/*<button onClick={() => window.location.reload()}>다시 시도</button>*/}
      <button onClick={() => {
        startTransition(() => { // UI 변경을 낮은 우선순위로 처리해 기존 화면을 유지한 채 부드럽게 교체
          router.refresh();  // 서버 측에서 서버 컴포넌트 다시 렌더링하고 결과를 받음
          reset();          // 에러 상태 초기화 + 컴포넌트 리렌더링
        });
      }}>
        다시 시도
      </button>
    </div>
  );
};