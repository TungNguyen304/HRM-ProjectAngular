export interface IToast {
  [key: string]: {
    summary: string;
    detail: string | ((par: any) => void);
  };
}

export const toastEn: IToast = {
  loginSuccess: {
    summary: 'Success',
    detail: 'Login success',
  },
  loginFail: {
    summary: 'Fail',
    detail: 'Email or password is not correct',
  },
  createEmployeeSuccess: {
    summary: 'Success',
    detail: 'One new employee has been added',
  },
  createEmployeeFail: {
    summary: 'Fail',
    detail: 'Create Employee Fail',
  },
  createEmployeeWarn: {
    summary: 'Fail',
    detail: 'You must properly complete all required fields',
  },
  maxLengthSocial: {
    summary: 'Add social network fail',
    detail: 'Social media accounts can only kick 5 accounts',
  },
  UploadImageSuccess: {
    summary: 'Upload Success',
    detail: 'Image upload success',
  },
  UploadImageTypeFail: {
    summary: 'Upload Fail',
    detail: 'Avt must be a png/jpg file',
  },
  UploadImageSizeFail: {
    summary: 'Upload Fail',
    detail: (value: number) => {
      return `The size of the Avt should not be more than ${value}mb`;
    },
  },
  uploadCvSuccess: {
    summary: 'Upload Success',
    detail: 'CV upload success',
  },
  uploadCvTypeFail: {
    summary: 'Upload Fail',
    detail: 'CV must be a pdf file',
  },
  uploadCvSizeFail: {
    summary: 'Upload Fail',
    detail: (value: number) => {
      return `The size of the CV should not be more than ${value}mb`;
    },
  },
  updateEmployeeSuccess: {
    summary: 'Update Success',
    detail: 'Employee updated',
  },
  deleteEmployeeSuccess: {
    summary: 'Delete Success',
    detail: 'Employee deleted',
  },
  deleteEmployeeFail: {
    summary: 'Delete Fail',
    detail: 'Employee not deleted',
  },
  uploadFileSuccess: {
    summary: 'Upload Success',
    detail: 'Upload File Success',
  },
  uploadFileFail: {
    summary: 'Upload Fail',
    detail: 'File type must be xlsx or xls image',
  },
  workplaceSuccess: {
    summary: 'Success',
    detail: (value: string) => {
      return `${value} Position Success`;
    },
  },
  workplaceFail: {
    summary: 'Fail',
    detail: (value: string) => {
      return `${value} Position Fail`;
    },
  },
  rejected: {
    summary: 'Rejected',
    detail: 'You have rejected',
  },
  cancelled: {
    summary: 'Cancelled',
    detail: 'You have cancelled',
  },
  providerSuccess: {
    summary: 'Success',
    detail: (value: string) => {
      return `${value} Provider Success`;
    },
  },
  providerFail: {
    summary: 'Fail',
    detail: (value: string) => {
      return `${value} Provider Fail`;
    },
  },
  deviceSuccess: {
    summary: 'Success',
    detail: (value: string) => {
      return `${value} Device Success`;
    },
  },
  deviceFail: {
    summary: 'Fail',
    detail: (value: string) => {
      return `${value} Device Fail`;
    },
  },
  RequestSuccess: {
    summary: 'Success',
    detail: 'Request Success',
  },
};

export const toastVi: IToast = {
  loginSuccess: {
    summary: 'Thành công',
    detail: 'Đăng nhập thành công',
  },
  loginFail: {
    summary: 'Thất bại',
    detail: 'Email / password Không đúng',
  },
  createEmployeeSuccess: {
    summary: 'Thành công',
    detail: 'Một nhân viên mới đã được thêm',
  },
  createEmployeeFail: {
    summary: 'Thất bại',
    detail: 'Tạo mới nhân viên thất bại',
  },
  createEmployeeWarn: {
    summary: 'Thất bại',
    detail: 'Bạn phải hoàn thành hợp lệ tất cả các trường yêu cầu',
  },
  maxLengthSocial: {
    summary: 'Thêm mạng xã hội thất bại',
    detail: 'Mạng xã hội chỉ được tối đa 5 tài khoản',
  },
  UploadImageSuccess: {
    summary: 'Tải lên thành công',
    detail: 'Image Tải lên thành công',
  },
  UploadImageTypeFail: {
    summary: 'Tải lên thất bại',
    detail: 'Avt phải là tệp png/jpg',
  },
  UploadImageSizeFail: {
    summary: 'Tải lên thất bại',
    detail: (value: number) => {
      return `Kích thước của Avt không được nhiều hơn ${value}mb`;
    },
  },
  uploadCvSuccess: {
    summary: 'Tải lên thành công',
    detail: 'CV Tải lên thành công',
  },
  uploadCvTypeFail: {
    summary: 'Tải lên thất bại',
    detail: 'CV phải là file pdf',
  },
  uploadCvSizeFail: {
    summary: 'Tải lên thất bại',
    detail: (value: number) => {
      return `Kích thước của CV không được nhiều hơn ${value}mb`;
    },
  },
  updateEmployeeSuccess: {
    summary: 'Thảy đổi thành công',
    detail: 'Nhân viên đã được thay đổi',
  },
  deleteEmployeeSuccess: {
    summary: 'Xoá thành công',
    detail: 'Nhân viên đã được xoá',
  },
  deleteEmployeeFail: {
    summary: 'Xoá thất bại',
    detail: 'Nhân viên không được xoá',
  },
  uploadFileSuccess: {
    summary: 'Tải lên thành công',
    detail: 'Tải file lên thành công',
  },
  uploadFileFail: {
    summary: 'Tải lên thất bại',
    detail: 'Loại File phải là ảnh xlsx hoặc xls',
  },
  workplaceSuccess: {
    summary: 'Thành công',
    detail: (value: string) => {
      return `${value} Vị trí thành công`;
    },
  },
  workplaceFail: {
    summary: 'Thất bại',
    detail: (value: string) => {
      return `${value} Vị trí thất bại`;
    },
  },
  rejected: {
    summary: 'Từ chối',
    detail: 'Bạn đã từ chối',
  },
  cancelled: {
    summary: 'Huỷ',
    detail: 'Bạn đã huỷ',
  },
  providerSuccess: {
    summary: 'Thành công',
    detail: (value: string) => {
      return `${value} Nhà cung cấp thành công`;
    },
  },
  providerFail: {
    summary: 'Thất bại',
    detail: (value: string) => {
      return `${value} Nhà cung cấp thất bại`;
    },
  },
  deviceSuccess: {
    summary: 'Thành công',
    detail: (value: string) => {
      return `${value} Thiết bị thành công`;
    },
  },
  deviceFail: {
    summary: 'Thất bại',
    detail: (value: string) => {
      return `${value} Thiết bị thất bại`;
    },
  },
  RequestSuccess: {
    summary: 'Thành công',
    detail: 'Yêu cầu thành công',
  },
};
