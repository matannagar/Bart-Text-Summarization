<?php

if (isset($_POST['submit'])) {
    if (isset($_POST['fname']) && isset($_POST['lname']) &&
         isset($_POST['email'])) {
        
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $email = $_POST['email'];

        $host = "localhost";
        $dbUsername = "root";
        $dbPassword = "1559MBN7553";
        $dbName = "test";

        $conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

        if ($conn->connect_error) {
            die('Could not connect to the database.');
        }
        else {
            $Select = "SELECT email FROM registration WHERE email = ? LIMIT 1";
            $Insert = "INSERT INTO registration(fname, lname, email) values(?,?,?)";

            $stmt = $conn->prepare($Select);
            $stmt->bind_param("s",$email);
            $stmt->execute();
            $stmt->bind_result($resultEmail);
            $stmt->store_result();
            $stmt->fetch();
            $rnum = $stmt->num_rows;

            if ($rnum == 0) {
                $stmt->close();

                $stmt = $conn->prepare($Insert);
                $stmt->bind_param("sss",$fname,$lname,$email);
                if ($stmt->execute()) {
                    echo "New record inserted sucessfully.";
                      echo "<script>
                 setTimeout(function(){
                    window.close();
                    },3000);
                 </script>";
                }
                else {
                    echo $stmt->error;
                }
            }
            else {
                echo "Already registered using this email, starting download...";
                 echo "<script>
                 setTimeout(function(){
                    window.close();
                    },3000);
                 </script>";
            }
            $stmt->close();
            $conn->close();
        }
    }
    else {
        echo "All field are required.";
        die();
    }
}
else {
    echo "Submit button is not set";
}
?>