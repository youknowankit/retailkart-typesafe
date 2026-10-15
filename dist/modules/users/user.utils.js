export const toUserResponse = (user) => {
    const { password: _password, otp: _otp, otpExpiry: _otpExpiry, ...userResponse } = user;
    return userResponse;
};
//# sourceMappingURL=user.utils.js.map