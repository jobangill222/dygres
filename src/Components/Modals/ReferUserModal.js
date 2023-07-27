import React, { useState, useContext, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { InputGroup, Form } from "react-bootstrap";
import { AiOutlineCopy } from "react-icons/ai";
import { MdCopyAll, MdOutlineContentCopy } from "react-icons/md";

import { BiCopy } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";
import { DContext } from "../../Context/DContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function ReferModal(props) {
  const { isShowReferModal, setIsShowReferModal, url } = props;

  const [copied, setCopied] = React.useState(false);

  const onChangeCopyValue = useCallback(({ target: { value } }) => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, []);

  const onCopy = useCallback(() => {
    setCopied(true);
  }, []);

  const { user } = useContext(DContext);
  const closePopup = async () => {
    setIsShowReferModal(false);
  };

  return (
    <>
      <Modal
        className="Actions-modal welcomepopup "
        show={true}
        onHide={closePopup}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="refer_header">
          <Modal.Title> Refer Dygres </Modal.Title>
          <div>
            <p className="mb-0 totalshare">
              {" "}
              Total Shares:{" "}
              <span> {user?.referradCount ? user.referradCount : 0}</span>
            </p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <div>
              <p>
                Refer dygres to your friend and earn referral points. Lorem
                ispum is a dummy text used to display dummy content for content
                creators.
              </p>
            </div>
            <div>
              <InputGroup className="mt-3 refer_input">
                <Form.Control
                  placeholder="Link Address"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  defaultValue={url ? url : null}
                  disabled={true}
                />
                <InputGroup.Text id="basic-addon2">
                  {copied ? (
                    <div className="copiedbar">
                      <TiTickOutline size={25} />{" "}
                      <p
                        className="content
                         "
                      >
                        Copied
                      </p>
                    </div>
                  ) : (
                    <div className="copiedbar" onClick={onChangeCopyValue}>
                      {/* <BiCopy onClick={copyText} size={25} /> */}
                      <CopyToClipboard
                        onCopy={onCopy}
                        // options={{ message: "Whoa!" }}
                        text={url ? url : null}
                      >
                        <BiCopy size={25} />
                      </CopyToClipboard>
                      <p className="content">Copy</p>
                    </div>
                  )}{" "}
                </InputGroup.Text>
              </InputGroup>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
