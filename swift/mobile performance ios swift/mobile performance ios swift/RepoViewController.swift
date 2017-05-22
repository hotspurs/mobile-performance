//
//  RepoViewController.swift
//  mobile performance ios swift
//
//  Created by Владислав Дубов on 10/05/2017.
//  Copyright © 2017 Владислав Дубов. All rights reserved.
//

import UIKit
import Octokit

class RepoViewController: UIViewController {
    @IBOutlet weak var name: UILabel!
    var activeRow: Repository!
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationItem.title = activeRow.name;
        self.navigationController!.navigationBar.topItem!.title = ""
        self.name.text = activeRow.name;
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
