import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch
} from "@nextui-org/react";

export function EditJurorModal({
  isOpen,
  onClose,
  selectedJuror,
  onSaveJuror,
}) {
  const [editedJuror, setEditedJuror] = useState({
    ...selectedJuror,
    FirstName: selectedJuror?.FirstName || "",
    LastName: selectedJuror?.LastName || "",
    MailingAddress: selectedJuror?.MailingAddress || "",
    City: selectedJuror?.City || "",
    State: selectedJuror?.State || "",
    Email: selectedJuror?.Email || "",
    BadgeNumber: selectedJuror?.BadgeNumber || "",
    SummonsDate: selectedJuror?.SummonsDate || "",
    ReportingLocation: selectedJuror?.ReportingLocation || "",
    CanPostpone: selectedJuror?.CanPostpone || false,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [canPostponeOptions] = useState([
    { key: "true", label: "True" },
    { key: "false", label: "False" },
  ]);

  useEffect(() => {
    setEditedJuror({
      ...selectedJuror,
      FirstName: selectedJuror?.FirstName || "",
      LastName: selectedJuror?.LastName || "",
      MailingAddress: selectedJuror?.MailingAddress || "",
      City: selectedJuror?.City || "",
      State: selectedJuror?.State || "",
      Email: selectedJuror?.Email || "",
      BadgeNumber: selectedJuror?.BadgeNumber || "",
      SummonsDate: selectedJuror?.SummonsDate || "",
      ReportingLocation: selectedJuror?.ReportingLocation || "",
      CanPostpone: selectedJuror?.CanPostpone || false,
    });
    setHasChanges(false);
  }, [selectedJuror]);

  const handleChange = (field, value) => {
    if (field === "CanPostpone") {
      value = value === "true";
    }
    setEditedJuror((prevJuror) => ({
      ...prevJuror,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSaveJuror(editedJuror);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setEditedJuror({ ...selectedJuror });
    setHasChanges(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} color="primary" size="sm">
      <ModalContent>
        <ModalHeader>Edit Juror</ModalHeader>
        <ModalBody>
          {selectedJuror && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="FirstName"
                value={editedJuror.FirstName}
                onChange={(e) => handleChange("FirstName", e.target.value)}
              />
              <Input
                label="Last Name"
                name="LastName"
                value={editedJuror.LastName}
                onChange={(e) => handleChange("LastName", e.target.value)}
              />
              <Input
                label="Mailing Address"
                name="MailingAddress"
                value={editedJuror.MailingAddress}
                onChange={(e) => handleChange("MailingAddress", e.target.value)}
              />
              <Input
                label="City"
                name="City"
                value={editedJuror.City}
                onChange={(e) => handleChange("City", e.target.value)}
              />
              <Input
                label="State"
                name="State"
                value={editedJuror.State}
                onChange={(e) => handleChange("State", e.target.value)}
              />
              <Input
                label="Email"
                name="Email"
                value={editedJuror.Email}
                onChange={(e) => handleChange("Email", e.target.value)}
              />
              <Input
                label="Badge Number"
                name="BadgeNumber"
                value={editedJuror.BadgeNumber}
                onChange={(e) => handleChange("BadgeNumber", e.target.value)}
              />
              <Input
                label="Summons Date"
                name="SummonsDate"
                value={editedJuror.SummonsDate}
                onChange={(e) => handleChange("SummonsDate", e.target.value)}
              />
              <Input
                label="Reporting Location"
                name="ReportingLocation"
                value={editedJuror.ReportingLocation}
                onChange={(e) =>
                  handleChange("ReportingLocation", e.target.value)
                }
              />
              <div className="flex items-center bg-default-100 rounded-lg">
                <label className="m-3 text-tiny text-foreground-700">
                  Can Postpone:
                </label>
                <Dropdown
                  aria-label="Can Postpone"
                  variant="flat"
                  className="mr-8"
                >
                  <DropdownTrigger>
                    <Button>
                      {editedJuror.CanPostpone ? "true" : "false"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    title="Can Postpone"
                    selectedKeys={editedJuror.CanPostpone ? "true" : "false"}
                    onAction={(key) => handleChange("CanPostpone", key)}
                  >
                    {canPostponeOptions.map((option) => (
                      <DropdownItem key={option.key}>
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onPress={handleCancel}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave} disabled={!hasChanges}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
