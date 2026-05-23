import { describe, expect, test } from "bun:test";
import { buildHealthPayload } from "./write-health";

describe("BitterPass marketing health payload", () => {
  test("includes release identity and no-secret metadata", () => {
    const payload = buildHealthPayload(
      "0123456789abcdef0123456789abcdef01234567",
    );

    expect(payload).toEqual({
      ok: true,
      status: "ok",
      service: "bitterpass.com",
      hostname: "bitterpass.com",
      git_sha: "0123456789abcdef0123456789abcdef01234567",
      release: "0123456789abcdef0123456789abcdef01234567",
      secret_material_returned: false,
    });
  });
});
