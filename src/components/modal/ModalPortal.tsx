import { ReactNode } from 'react';
import ReactDom from 'react-dom';

type ModalPortalProps = {
  children: ReactNode;
};

const ModalPortal = ({ children }: ModalPortalProps) => {
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, []);
  // ********************* 페이지 이동시 모달,,,? 스크롤 안됨
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  return ReactDom.createPortal(children, modalRoot);
};

export default ModalPortal;
