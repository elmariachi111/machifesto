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

import { Signer } from "./backend/dbschema";

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
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
