"use client";

import { useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import Modal from "@/components/modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="flex gap-4 w-1/3 justify-center p-4 items-center">
      <Input
        label="name"
        id="name"
        placeholder="Masukkan nama anda"
        required
      />
      <Button onClick={() => setIsModalOpen(true)}>Click Me</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-[#344054]">
            Modal Example
          </h2>
          <p className="mt-2 text-sm text-[#667085]">Example simple modal</p>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}