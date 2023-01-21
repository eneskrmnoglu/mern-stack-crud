import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function UserPage() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUserName] = useState("");
  const [img, setImg] = useState("");

  //güncellenecek verileri tutacağımız state'ler.
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newUsername, setNewUsername] = useState("");
  const [newImg, setNewImg] = useState("");

  //post metodu
  const postHandler = () => {
    axios.post("http://localhost:5000/createUser", {
      name: name,
      img: img,
      age: age,
      username: username,
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${name} isimli kullanıcı başarıyla eklendi`,
      showConfirmButton: false,
      timer: 1500,
    });
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  };
  const updateHandler = (id) => {
    axios
      .put("http://localhost:5000/updateUser", {
        id: id,
        newName: newName,
        newAge: newAge,
        newImg: newImg,
        newUsername: newUsername,
      })
      .then((res) =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Güncelleme Başarılı`,
          showConfirmButton: false,
          timer: 1500,
        })
      );
    document.querySelectorAll("input").forEach(function (input) {
      input.value = "";
    });
  };
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/deleteUser/${id}`);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/getUsers")
      .then((res) => setUsers(res.data));
  }, [users]);
  return (
    <div className="container">
      <h2 className="display-3 text-danger">KULLANICI LİSTESİ</h2>
      <div className="row ">
        {users.map((user) => (
          <div className="col-md-4 my-5">
            <div className="card mx-auto " style={{ width: "18rem" }}>
              <img src={user.img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">username: {user.username}</p>
                <p className="card-text">yaş: {user.age}</p>
                <hr />
                <input
                  type="text"
                  placeholder="Güncellenecek İsmi Giriniz"
                  className="form-control border border-dark my-1"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Güncellenecek Yaşı Giriniz"
                  className="form-control border border-dark my-1"
                  onChange={(e) => setNewAge(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Güncellenecek Resmi Giriniz"
                  className="form-control border border-dark my-1"
                  onChange={(e) => setNewImg(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Güncellenecek UserName Giriniz"
                  className="form-control border border-dark my-1"
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <button
                  className="btn btn-success mx-2"
                  onClick={() => updateHandler(user._id)}
                >
                  Güncelle
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandler(user._id)}
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="display-4 text-warning">YENİ KULLANICI EKLEME PANELİ</h2>
      <table className="table table-dark ">
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Adınızı Yazınız"
                onChange={(e) => setName(e.target.value)}
                defaultValue=""
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Yaşını Yazınız"
                onChange={(e) => setAge(e.target.value)}
                defaultValue=""
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Kullanıcı Adınızı Yazınız"
                onChange={(e) => setUserName(e.target.value)}
                defaultValue=""
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Fotoğraf Linkini Yapıştırınız"
                onChange={(e) => setImg(e.target.value)}
                defaultValue=""
              />
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <button className="btn btn-warning w-100" onClick={postHandler}>
                KAYDET
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;
