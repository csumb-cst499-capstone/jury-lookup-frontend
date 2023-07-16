import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Link,
  Tooltip,
} from "@nextui-org/react";

export function EditJurorModal({
  isOpen,
  onClose,
  selectedJuror,
  onSaveJuror,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} color="primary" size="sm">
      <ModalContent>
        <ModalHeader>Edit Juror</ModalHeader>
        <ModalBody>
          {selectedJuror && (
            <div>
              <Input label="First Name" value={selectedJuror.FirstName} />
              <Input label="Last Name" value={selectedJuror.LastName} />
              {/* Add other form fields for editing */}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Link color="secondary" onClick={onClose}>
            Cancel
          </Link>
          <Link color="primary" onClick={onSaveJuror}>
            Save
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditJurorModal;
