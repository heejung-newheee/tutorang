import { ReactNode, useState } from 'react';
import BaseModal from './BaseModal';

type ModalProps = {
  onClose: () => void;
  onConfirm: (text: string) => void;
  title?: string;
  content?: ReactNode;
};
const PromptModal = ({ title, content, onClose, onConfirm }: ModalProps) => {
  const [text, setText] = useState('');
  return (
    <BaseModal onClose={onClose}>
      <div>
        <p>{title}</p>
        {content && <p>{content}</p>}
        <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
        <button onClick={onClose}>취소</button>
        <button onClick={() => onConfirm(text)}>확인</button>
      </div>
    </BaseModal>
  );
};

export default PromptModal;
