import { ReactNode } from 'react';
import { useModal } from '.';
import AlertModal from '../components/modal/AlertModal';
import ConfirmModal from '../components/modal/ConfirmModal';
import PromptModal from '../components/modal/PromptModal';

type OpenPopupProps = {
  type: 'alert' | 'confirm' | 'prompt';
  title?: string;
  content?: ReactNode;
};
const usePopup = () => {
  const modal = useModal();
  const openPopup = ({ type, title, content }: OpenPopupProps) =>
    new Promise((resolve) => {
      modal.open(({ close }) => {
        switch (type) {
          case 'alert':
            return (
              <AlertModal
                title={title}
                content={content}
                onClose={() => {
                  resolve(true);
                  close();
                }}
              />
            );
          case 'confirm':
            return (
              <ConfirmModal
                title={title}
                content={content}
                onConfirm={() => {
                  resolve(true);
                  close();
                }}
                onClose={() => {
                  resolve(false);
                  close();
                }}
              />
            );

          case 'prompt':
            return (
              <PromptModal
                title={title}
                content={content}
                onConfirm={(text) => {
                  resolve(text);
                  close();
                }}
                onClose={() => {
                  resolve(null);
                  close();
                }}
              />
            );
        }
      });
    });
  return { openPopup };
};

export default usePopup;
