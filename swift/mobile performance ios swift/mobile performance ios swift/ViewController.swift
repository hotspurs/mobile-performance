//
//  ViewController.swift
//  mobile performance ios swift
//
//  Created by Владислав Дубов on 09/05/2017.
//  Copyright © 2017 Владислав Дубов. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBAction func loginButtonPressed(_ sender: Any) {
        let url = config.authenticate()
        UIApplication.shared.open(url!)
        print("Auth")
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        if UserDefaults.standard.object(forKey: "accessToken") != nil {
            DispatchQueue.main.async() {
                self.performSegue(withIdentifier: "auth", sender: nil)
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

