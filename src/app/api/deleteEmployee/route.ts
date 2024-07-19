import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/utils/connectToDB';
import Employee from '@/models/employee';

export const revalidate = 0;

export async function DELETE(request: NextRequest) {
    try {
        // Get the employee ID from the URL query parameters
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        console.log("id***",id);
        

        // Check if ID is provided
        if (!id) {
            return NextResponse.json(
                { message: "Employee ID is required" },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDB();

        // Find and delete the employee
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        // Check if an employee was actually deleted
        if (!deletedEmployee) {
            return NextResponse.json(
                { message: "Employee not found" },
                { status: 404 }
            );
        }

        // Return success response
        return NextResponse.json(
            { message: "Employee deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log('Error', error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}