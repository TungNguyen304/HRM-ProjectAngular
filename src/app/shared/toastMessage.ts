interface IToast {
  [key:string]: {
    summary: string;
    detail: string | Function;
  };
}

export const toast: IToast = {
  createEmployeeSuccess: {
    summary: 'Create Employee Success',
    detail: 'One new employee has been added',
  },
  createEmployeeFail: {
    summary: 'Create Employee Fail',
    detail: 'You have not completed all required fields'
  },
  maxLengthSocial: {
    summary: 'Add social network fail',
    detail: 'Social media accounts can only kick 5 accounts'
  },
  uploadCvSuccess: {
    summary: 'Upload Success',
    detail: 'CV upload success'
  },
  uploadCvTypeFail: {
    summary: 'Upload Fail',
    detail: 'CV must be a pdf file'
  },
  uploadCvSizeFail: {
    summary: 'Upload Fail',
    detail: (value:string) => {
      return `The size of the CV should not be more than ${value}mb`
    } 
  },
  updateEmployeeSuccess: {
    summary: 'Update Success',
    detail: 'Employee updated'
  },
  deleteEmployeeSuccess: {
    summary: 'Delete Success',
    detail: 'Employee deleted'
  },
  deleteEmployeeFail: {
    summary: 'Delete Fail',
    detail: 'Employee not deleted'
  },
  uploadFileSuccess: {
    summary: 'Upload Success',
    detail: 'Tải file lên thành công'
  },
  uploadFileFail: {
    summary: 'Upload Fail',
    detail: 'Loại File phải là ảnh xlsx hoặc xls'
  },
  workplaceSuccess: {
    summary: 'Success',
    detail: (value:string) => {
        return `${value} Position Success`
    }
  },
  workplaceFail: {
    summary: 'Fail',
    detail: (value:string) => {
        return `${value} Position Fail`
    }
  },
  rejected: {
    summary: 'Rejected',
    detail: 'You have rejected'
  },
  cancelled: {
    summary: 'Cancelled',
    detail: 'You have cancelled'
  }
};
