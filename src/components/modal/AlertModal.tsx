import { ReactNode } from 'react';
import BaseModal from './BaseModal';
type ModalProps = {
  onClose: () => void;
  title?: string;
  content?: ReactNode;
};
const AlertModal = ({ title, content, onClose }: ModalProps) => {
  return (
    <BaseModal onClose={onClose}>
      <div>
        <p>{title}</p>
        {content && <p>{content}</p>}
        <button onClick={onClose}>확인</button>
      </div>
    </BaseModal>
  );
};

export default AlertModal;
