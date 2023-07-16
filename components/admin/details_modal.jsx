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

export function ViewDetailsModal({ isOpen, onClose, selectedJuror }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} color="primary" size="sm">
      <ModalContent>
        <ModalHeader>View Details</ModalHeader>
        <ModalBody>
          {selectedJuror && (
            <div>
              <p>First Name: {selectedJuror.FirstName}</p>
              <p>Last Name: {selectedJuror.LastName}</p>
              {/* Add other details here */}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Link color="secondary" onClick={onClose}>
            Close
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ViewDetailsModal;
