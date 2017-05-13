//
//  RepositoriesViewController.swift
//  mobile performance ios swift
//
//  Created by Владислав Дубов on 10/05/2017.
//  Copyright © 2017 Владислав Дубов. All rights reserved.
//

import UIKit
import Octokit

class RepositoriesViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    var activeRow = 0
    @IBOutlet var tableView: UITableView!

    func downloadData() {

    }
    
    internal func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    
    internal func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: UITableViewCellStyle.default, reuseIdentifier: "Cell")
        cell.textLabel?.text = "1"
        
        return cell
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        activeRow = indexPath.row
        performSegue(withIdentifier: "toRepoController", sender: nil)
    }
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "toRepoController" {
            let repoViewControler = segue.destination as! RepoViewController
            repoViewControler.activeRow = activeRow
        }
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        self.downloadData();
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
