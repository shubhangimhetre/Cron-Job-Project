const mongoose=require('mongoose')
const student=require('../model/student_model.js')
const cron= require('node-cron');

exports.get_student=async(req,res)=>{
    try{
        var students=await student.find()
        res.json(students)
    }catch(err){
        res.send('Error'+err)
    }
}

exports.get_student_by_rollno=async(req,res)=>{
    const rollNo=req.params.rollno
    try{
        const student1=await student.findOne({rollNumber:rollNo})
        res.json(student1)
    }catch(err){
        res.send(err)
    }
}

exports.post_student=async(req,res)=>{
    const student_data=new student(req.body)
    try{
        const student1=await student_data.save()
        res.send(student1)
        cron.schedule('*/15 * * * * *', async() => {
            console.log('running a task..');
            try{
                var update={timestamps:true}
                await student1.updateOne(update);
                const student2=await student.findOne({rollNumber:req.body.rollNumber})
                console.log(student2)
            }catch(err){
                res.send(err)
            } 
        });
    }catch(err){res.send(err)}
}


exports.update_student=async(req,res)=>{
    const rollNo=req.params.rollno
    try{
        const student1=await student.findOne({rollNumber:rollNo})
        const update = req.body;
        await student1.updateOne(update);
        const updatedstudent1=await student.findOne({rollNumber:rollNo})
        res.send(updatedstudent1)
    }catch(err){
        res.send(err)
    }    
}


exports.delete_student=async(req,res)=>{
    const rollNo=req.params.rollno
    try{
        const student1=await student.findOne({rollNumber:rollNo})
        if (student1){
            student.deleteOne({rollNumber:rollNo }, function (err) {
                if (err) console.log(err);
                res.send('deleted successfully')
            });
        }else{
            res.send('This roll number is not present.')
        }
    }catch(err){
        res.send(err)
    }

}