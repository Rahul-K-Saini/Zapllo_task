import { NextResponse } from 'next/server';
import connectToDB from '@/utils/connectToDB';
import Employee from '@/models/Employee';

export async function GET() {
    try {
        await connectToDB();
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
        console.error('Error in GET /api/employees:', error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}