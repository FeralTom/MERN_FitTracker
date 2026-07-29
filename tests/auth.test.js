import { jest } from "@jest/globals";

const mockUserFindOne = jest.fn();
const mockUserCreate = jest.fn();
const mockHash = jest.fn();
const mockCompare = jest.fn();
const mockSign = jest.fn();

jest.unstable_mockModule("../models/User.js", () => ({
  default: {
    findOne: mockUserFindOne,
    create: mockUserCreate,
  },
}));

jest.unstable_mockModule("bcryptjs", () => ({
  default: {
    hash: mockHash,
    compare: mockCompare,
  },
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: mockSign,
  },
}));

const { registerUser, loginUser } = await import("../controllers/authController.js");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("email authentication", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("normalizes the email during registration", async () => {
    mockUserFindOne.mockResolvedValue(null);
    mockHash.mockResolvedValue("hashed-password");
    mockUserCreate.mockResolvedValue({
      _id: "user-1",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
    });

    const req = {
      body: {
        firstName: "Jane",
        lastName: "Doe",
        email: "  Jane@Example.com  ",
        password: "123456",
      },
    };
    const res = mockResponse();

    await registerUser(req, res);

    expect(mockUserFindOne).toHaveBeenCalledWith({ email: "jane@example.com" });
    expect(mockUserCreate).toHaveBeenCalledWith(
      expect.objectContaining({ email: "jane@example.com" })
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("normalizes the email during login", async () => {
    mockUserFindOne.mockResolvedValue({
      _id: "user-1",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      password: "hashed-password",
    });
    mockCompare.mockResolvedValue(true);
    mockSign.mockReturnValue("token-123");

    const req = {
      body: {
        email: "  JANE@EXAMPLE.COM  ",
        password: "123456",
      },
    };
    const res = mockResponse();

    await loginUser(req, res);

    expect(mockUserFindOne).toHaveBeenCalledWith({ email: "jane@example.com" });
    expect(mockCompare).toHaveBeenCalledWith("123456", "hashed-password");
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
