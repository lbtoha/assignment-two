import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // data validation using zod
    const zodValidateData = userValidationSchema.parse(user);

    const result = await UserServices.createUserInDB(zodValidateData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User failed to create',
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'User got successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Failed to get all users',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdInNumber = parseInt(userId);
    const result = await UserServices.getSingleUserFromDB(userIdInNumber);

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    const { userId } = req.params;
    const userIdInNumber = parseInt(userId);
    const result = await UserServices.updateUserInDB(
      userIdInNumber,
      updatedData,
    );

    if (result === null) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    console.log(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdInNumber = parseInt(userId);
    const result = await UserServices.deleteUserFromDB(userIdInNumber);

    if (result === null) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    console.log(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdInNumber = parseInt(userId);
    const productData = req.body;

    const result = await UserServices.addNewProductInDB(
      userIdInNumber,
      productData,
    );
    if (result === null) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not found',
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdInNumber = parseInt(userId);

    const result = await UserServices.getAllOrdersFromDB(userIdInNumber);
    console.log('dfdfd', result);
    if (result === undefined) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: {
          orders: result,
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not found',
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdInNumber = parseInt(userId);

    const result = await UserServices.calculateTotalPriceInDB(userIdInNumber);
    console.log('dfdfd', result);
    if (result === undefined) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: {
          orders: result,
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not found',
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addProduct,
  getOrders,
  calculateTotalPrice,
};
