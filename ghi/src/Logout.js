import React from 'react'
// import { useState } from 'react'

export default function Logout() {

    async function onSubmit(){
      const result = await Logout();
    }

  return(
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <form>
                <h1> Log Out </h1>
                <button type="button" className="btn btn-primary" onClick={onSubmit}>Log Out</button>
              </form>
            </div>
        </div>
    </div>
  );
}