<?php
    /* If you set this on every page the path will always be correct */
    set_include_path( $_SERVER['DOCUMENT_ROOT'] . '/php/' );
    include( 'functions.php' );


if (isset($_POST['submit'])) {
    if (isset($_POST['fname']) && isset($_POST['lname']) &&
         isset($_POST['email'])) {
        
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $email = $_POST['email'];

        $host = "localhost";
        $dbUsername = "root";
        $dbPassword = "";
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
                }
                else {
                    echo $stmt->error;
                }
            }
            else {
                echo "Someone already registers using this email.";
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