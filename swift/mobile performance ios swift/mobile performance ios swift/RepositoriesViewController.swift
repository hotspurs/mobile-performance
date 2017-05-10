//
//  RepositoriesViewController.swift
//  mobile performance ios swift
//
//  Created by Владислав Дубов on 10/05/2017.
//  Copyright © 2017 Владислав Дубов. All rights reserved.
//

import UIKit
import Alamofire

class RepositoriesViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    var activeRow = 0
    @IBOutlet var tableView: UITableView!
    struct Repo {
        let name : String
        
        init(dictionary: [String:String]) {
            self.name = dictionary["name"] ?? ""
        }
    }
    
    var repositoriesData = [Repo]()

    func downloadData() {
        Alamofire.request("https://api.github.com/users/hotspurs/repos").responseJSON { response in
            //Optional binding to handle exceptions
            print("=>", response.result.value);
            if let json = response.result.value as? [[String:String]] {
                self.repositoriesData = json.map{ Repo(dictionary: $0) }
                self.tableView.reloadData()
            }
        }
    }
    
    internal func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return repositoriesData.count
    }
    
    
    internal func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: UITableViewCellStyle.default, reuseIdentifier: "Cell")
        let repo = repositoriesData[indexPath.row]
        cell.textLabel?.text = repo.name
        
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
