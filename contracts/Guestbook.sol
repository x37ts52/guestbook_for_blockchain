// CompilerRange definieren
pragma solidity >=0.5.0 <0.6.0;

// Smart Contract
contract Guestbook {

    // Objekt: Nachrichtenbeitrag
    struct Post {
        string name;
        string message;
    }

    // Nachrichtenbeiträge sollen in "posts" gesammelt werden
    mapping(uint => Post) posts;

    // Objekt: Datum
    struct Date {
        uint day;
        uint month;
        uint year;
    }

    // Daten sollen in "dates" gesammelt werden
    mapping(uint => Date) dates;

    // Objekt: Zeit
    struct Time {
        uint hour;
        uint minute;
    }

    // Zeiten sollen in "times" gesammelt werden
    mapping(uint => Time) times;

    // Ein Array welches als Liste verwendet wird (nur interner Contract-Zugriff)
    uint[] internal postIndex;


    // Setter

    // Eine Nachricht setzen (nur interner Contract-Zugriff)
    function setPost(uint _postIndex, string memory _name, string memory _message) private {
        posts[_postIndex].name = _name;
        posts[_postIndex].message = _message;
    }

    // Ein Datum setzen (nur interner Contract-Zugriff)
    function setDate(uint _postIndex, uint _day, uint _month, uint _year) private {
        dates[_postIndex].day = _day;
        dates[_postIndex].month = _month;
        dates[_postIndex].year = _year;
    }

    // Eine Zeit setzen (nur interner Contract-Zugriff)
    function setTime(uint _postIndex, uint _hour, uint _minute) private {
        times[_postIndex].hour = _hour;
        times[_postIndex].minute = _minute;
    }

    // Post, Datum und Zeit in einer Funktion setzen (externer Zugriff erlaubt)
    // Info: Schreiben in die Blockchain kostet Transaktionsgebühren
    // Also auf eine Transaktion begrenzen!
    function setAll(uint _postIndex,
        string memory _name, string memory _message,
        uint _day, uint _month, uint _year,
        uint _hour, uint _minute) public {
        postIndex.push(_postIndex) -1;

        setPost(_postIndex, _name, _message);
        setDate(_postIndex, _day, _month, _year);
        setTime(_postIndex, _hour, _minute);
    }


    // Getter

    // Post, Datum und Zeit ausgeben (externer Zugriff erlaubt)
    function getPosting(uint _postIndex) public view returns (string memory, string memory,
        uint, uint, uint, uint, uint) {
        return (
        posts[_postIndex].name,
        posts[_postIndex].message,
        dates[_postIndex].day,
        dates[_postIndex].month,
        dates[_postIndex].year,
        times[_postIndex].hour,
        times[_postIndex].minute
        );
    }

    // Arraygröse wird ausgegeben (externer Zugriff erlaubt)
    function countPostIndex() public view returns (uint) {
        return postIndex.length;
    }

}