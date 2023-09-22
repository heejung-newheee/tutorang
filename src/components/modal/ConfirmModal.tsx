import { ReactNode } from 'react';
import BaseModal from './BaseModal';

type ModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  content?: ReactNode;
};
const ConfirmModal = ({ title, content, onClose, onConfirm }: ModalProps) => {
  return (
    <BaseModal onClose={onClose}>
      <div>
        <p>{title}</p>
        {content && <p>{content}</p>}
        <button onClick={onClose}>취소</button>
        <button onClick={onConfirm}>확인</button>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
