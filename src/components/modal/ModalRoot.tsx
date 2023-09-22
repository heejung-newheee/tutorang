import { Fragment, useContext } from 'react';
import { GlobalModalContext } from '../../context/GlobalModalContext';

const ModalRoot = () => {
  const { state } = useContext(GlobalModalContext);
  return (
    <>
      {[...state.modals.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </>
  );
};

export default ModalRoot;
