"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import useSWR, { Fetcher } from "swr";
import { Camelize } from "camelize-ts";
import { Button } from "@nextui-org/button";

import { Signer } from "./backend/dbschema";
import { SignatureIcon } from "./icons";

export default function Signers() {
  const fetcher: Fetcher<
    Array<Camelize<Signer & { created_at: string }>>,
    string
  > = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR("/api/signers", fetcher);

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        <TableColumn>signer</TableColumn>
        <TableColumn>reposted at</TableColumn>
        <TableColumn>signed</TableColumn>
      </TableHeader>
      {/* <TableBody>
        <TableRow>
          <TableCell>Tony Reichert</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody> */}
      <TableBody items={data || []}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>
              <User
                avatarProps={{ radius: "lg", src: item.profilePictureUrl }}
                description={item.twitterHandle}
                name={item.userName}
              >
                {item.twitterHandle}
              </User>
            </TableCell>

            <TableCell>{item.createdAt}</TableCell>
            <TableCell>
              {item.attestation ? (
                <Button
                  isIconOnly
                  aria-label="Attestation"
                  color="default"
                  radius="full"
                  variant="flat"
                  onClick={() => console.log(item.attestation)}
                >
                  <SignatureIcon size={25} />
                </Button>
              ) : null}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
