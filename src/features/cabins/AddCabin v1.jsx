import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOnClose = () => setIsOpenModal(isOpenModal => !isOpenModal);

  return (
    <div>
      <Button onClick={() => setIsOpenModal(isOpenModal => !isOpenModal)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={handleOnClose}>
          <CreateCabinForm onCloseModal={handleOnClose} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
