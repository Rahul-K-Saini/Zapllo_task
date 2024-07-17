import { NextResponse } from 'next/server';
import connectToDB from '@/utils/connectToDB';
import Employee from '@/models/employee';

export async function GET() {
    try {
        await connectToDB();
        // find all employees in the database
        const employees = await Employee.find();
        return NextResponse.json(
            {
                message: "Employees fetched successfully",
                employees
            },
            { status: 200 }
        );
    }
    catch (error) {
        console.log('Error', error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}